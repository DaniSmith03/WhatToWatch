import clientPromise from '../lib/mongodb';

export default function getUsers({ users }) {
  return (
    <div>
      <h1>Users In Database</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {users.map((user) => (
          <li>
            <h2>{user.id}</h2>
            <h3>{user.name}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db('Lunchbox_App');

    const users = await db
      .collection('Users')
      .find({})
      .sort({ metacritic: -1 })
      .toArray();

    return {
      props: { users: JSON.parse(JSON.stringify(users)) },
    };
  } catch (e) {
    console.error(e);
  }
}
