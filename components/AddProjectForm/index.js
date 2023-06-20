export default function AddProjectForm() {
  return (
    <>
      <form>
        <h3>this is a form</h3>
        <section>
          <select>
            <option>--please choose the status--</option>
            <option>Planning</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Hibernating</option>
          </select>
          <select>
            <option>--are you happy--</option>
            <option>Excited</option>
            <option>Happy</option>
            <option>Normal</option>
            <option>Bad</option>
          </select>
        </section>
        <section>Upload Picture here</section>
        <section>
          <label htmlFor="details"></label>
        </section>
        <section>Upload Pattern here</section>
      </form>
    </>
  );
}
