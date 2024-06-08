import { useForm, Controller } from "react-hook-form";

import { generate } from "./service";

const Generate = () => {
  const { handleSubmit, control, formState: {errors}} = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (data.end > new Date()) {
        alert("End date shouldn't be after today!");
        return;
      }
      if (data.start.getYear() <= 2010) {
        alert("Start date should be after 2010!");
        return;
      }
      if (data.commits > 100) {
        alert("Commits can't exceed more than 100!");
        return;
      }
      if (data.frequency > 100) {
        alert("Frequency should be in range of 0 - 100!");
        return;
      }
      const response = await generate(data);
    } catch (error) {
      alert("Failed to generate github activity");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="github-activity-form">
      <div>
        <label>Start Date:</label>
        <Controller
          name="start"
          control={control}
          defaultValue=""
          rules={{ required: "Start Date is required" }}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors?.start && <p className="error">{errors?.start?.message}</p>}
      </div>

      <div>
        <label>End Date:</label>
        <Controller
          name="end"
          control={control}
          defaultValue=""
          rules={{ required: "End Date is required" }}
          render={({ field }) => <input type="date" {...field} />}
        />
        {errors?.end && <p className="error">{errors?.end?.message}</p>}
      </div>

      <div>
        <label>Maximum Commits:</label>
        <Controller
          name="commits"
          control={control}
          defaultValue=""
          rules={{
            required: "Maximum Commits is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Maximum Commits must be a positive number",
            },
          }}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors?.commits && (
          <p className="error">{errors?.commits?.message}</p>
        )}
      </div>

      <div>
        <label>Frequency:</label>
        <Controller
          name="frequency"
          control={control}
          defaultValue=""
          rules={{
            required: "Frequency is required",
            pattern: {
              value: /^[1-9]\d*$/,
              message: "Frequency must be a positive number",
            },
          }}
          render={({ field }) => <input type="number" {...field} />}
        />
        {errors?.frequency && <p className="error">{errors?.frequency?.message}</p>}
      </div>

      <button type="submit">Generate</button>
    </form>
  )
}

export default Generate;