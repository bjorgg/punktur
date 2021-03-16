


export default function signup( { users }) {
    
    /* const createUser = async (user) => {
    const data = fetch(`http://localhost:3000/api/createUser?user_id=${user._id}`)
    const res = await
    } */

    return (
        <div>
          <form>
            <label>Nafn</label>
            <input type='text'></input>
            <button onClick={() =>createUser(user)}>Skrá</button>
          </form>
        </div>
    )
}
