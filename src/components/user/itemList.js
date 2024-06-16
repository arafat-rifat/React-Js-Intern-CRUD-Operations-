import Image from "next/image";
import emptyImg from "../../assets/empty.png";

const ItemList = ({ items, onEdit, onDelete, onBlock }) => {
  return (
    <div>
      {items.length === 0 ? (
        <div className="mt-10 flex items-center justify-center flex-col gap-2">
          <Image src={emptyImg} alt="empty" height="60" width="60" />
          <h4 className="text-lg font-semibold">No items available.</h4>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="text-center">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{item.firstName}</td>
                  <td className="py-2 px-4 border-b">{item.lastName}</td>
                  <td className="py-2 px-4 border-b">{item.email}</td>
                  <td className="py-2 px-4 border-b">{item.phone}</td>
                  <td className="py-2 px-4 border-b">
                    {item.isBlocked ? "Blocked" : "Active"}
                  </td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                    {item.isBlocked ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => onBlock(item.id, false)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        onClick={() => onBlock(item.id, true)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ItemList;
