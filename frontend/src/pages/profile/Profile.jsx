import { useAuth } from "../../context/AuthContext";

export default function Profile(){
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Profile</h2>
      <pre>{JSON.stringify(user,null,2)}</pre>
    </div>
  );
}
