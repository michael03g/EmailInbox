import { useEffect, useState } from "react";
import { getEmails, markRead, moveToTrash, recoverFromTrash, createEmail, markUnread } from "./service";
import { Link, useNavigate } from "react-router-dom";
import './Email.css'

const Email = () => {
  const [emails, setEmails] = useState<any>([]);
  const [filteredEmails, setFilteredEmails] = useState<any>([]);
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<string>("sent");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [parentId, setParentId] = useState<any>();
  const history = useNavigate();
  const currentEmail = localStorage.getItem('email');

  useEffect(() => {
    if (localStorage.getItem('email') === "") {
      alert("Please login");
      history("/");
    }
    const fetchData = async () => {
      const data = await getEmails();
      setEmails(data);
    }
    fetchData();
  }, []);

  const onClickDelete = async (id: number, deleted: boolean) => {
    if (deleted) await recoverFromTrash(id);
    else await moveToTrash(id);
    const data = await getEmails();
    setEmails(data);
  }

  const onClickRead = async (id: number, read: boolean) => {
    if (read)
      await markUnread(id);
    else
      await markRead(id);
    const data = await getEmails();
    setEmails(data);
  }

  const newEmail = () => {
    setShowModal(true);
    setModalTitle("New Email");
    setSender(currentEmail || "");
    setTitle("");
    setDescription("");
    setParentId(null);
  }

  const replyEmail = (email: any) => {
    setShowModal(true);
    setModalTitle("Reply Email");
    setSender(email.receiver);
    setReceiver(email.sender);
    setTitle("");
    setDescription("");
    setParentId(email.id);
  }

  const viewContent = (id: number, emailDescription: any) => {
    setShowModal(true);
    setModalTitle("View Content");
    setDescription(emailDescription);
    onClickRead(id, false);
  }

  const viewReplies = (replies: any) => {
    setShowModal(true);
    setModalTitle("View Replies");
    setDescription(replies.map(a => a.description).join("<p>---------------------</p>"))
  }

  const handleSendEmail = async () => {
    if (/^[\w-.]+@hometask\.com$/i.test(receiver)) {
      let data = { parentId, sender, receiver, title, description};
      await createEmail(data);
      data = await getEmails();
      setEmails(data);
      setShowModal(false);
    }
    else {
      alert("Invalid Sender");
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const filterEmails = () => {
    let newEmails = [...emails];
    const readFilters = filter === 'all' ? [true, false] : filter === 'read' ? [true] : [false];
    newEmails = newEmails.filter(email => email.parentId === null);
    switch (view)  {
      case "trash":
        newEmails = newEmails.filter(email => email.deleted);
        break;
      case "sent":
        newEmails = newEmails.filter(email => !email.deleted).filter(email => email.sender === currentEmail).filter(email => readFilters.includes(email.read));
        break;
      case "received":
        newEmails = newEmails.filter(email => !email.deleted).filter(email => email.receiver === currentEmail).filter(email => readFilters.includes(email.read));
        break;
      default:break;
    }
    newEmails = newEmails.map(email => {
      return {
        ...email,
        replies: emails.filter(mail => mail.parentId === email.id)
      }
    })
    setFilteredEmails(newEmails);
  }

  useEffect(() => {
    filterEmails();
  }, [filter, view, emails]);

  return (
    <div>
      <div className="control-container">
        <label>Filter By:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} disabled={view === "trash"}>
          <option value={"all"}>All</option>
          <option value={"read"}>Read</option>
          <option value={"unread"}>Unread</option>
        </select>

        <label>View:</label>
        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value={"sent"}>Sent</option>
          <option value={"received"}>Received</option>
          <option value={"trash"}>Trash</option>
        </select>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalTitle}</h2>
            {modalTitle.includes("View") ? (
              <>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
                <button onClick={() => setShowModal(false)}>Close</button>
              </>
            ) : (
              <div>
                <div>
                  <label>Sender:</label>
                  <input
                    type="text"
                    value={sender}
                    readOnly
                    onChange={(e) => setSender(e.target.value)}
                  />
                </div>
                <div>
                  <label>Receiver:</label>
                  <input
                    type="text"
                    value={receiver}
                    readOnly={modalTitle !== "New Email"}
                    onChange={(e) => setReceiver(e.target.value)}
                  />
                </div>
                <div>
                  <label>Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="modal-buttons">
                  <button onClick={handleSendEmail}>Send</button>
                  <button onClick={handleCloseModal}>Cancel</button>
                </div>
              </div>)}
            </div>
          </div>
      )}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Title</th>
              <th>Description</th>
              <th>Read</th>
              <th><button onClick={() => newEmail()}>New</button></th>
            </tr>
          </thead>
          <tbody>
            {
              filteredEmails.map((email: any) => (
                <tr>
                  <td>{email.id}</td>
                  <td>{email.sender}</td>
                  <td>{email.receiver}</td>
                  <td>{email.title}</td>
                  <td>
                    <button onClick={() => viewContent(email.id, email.description)}>See Content</button>
                    {email.replies.length > 0 && (<button onClick={() => viewReplies(email.replies)}>Replies</button>)}
                  </td>
                  <td><button onClick={() => onClickRead(email.id, email.read)}>Mark as {email.read ? "Unread" : "Read"}</button></td>
                  <td>
                    <button onClick={() => replyEmail(email)}>Reply</button>
                    <button onClick={() => onClickDelete(email.id, email.deleted)}>{email.deleted ? "Recover" : "Delete"}</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default Email;