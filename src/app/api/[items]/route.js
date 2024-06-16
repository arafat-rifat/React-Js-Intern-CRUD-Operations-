
let items = [];

export async function GET() {
  return new Response(JSON.stringify(items), { status: 200 });
}

export async function POST(req) {
  const newItem = await req.json();
  newItem.isBlocked = false; 
  items.push(newItem);
  return new Response(JSON.stringify(newItem), { status: 201 });
}

export async function PUT(req) {
  const { id, updatedItem } = await req.json();
  items = items.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedItem, email: item.email }; 
    }
    return item;
  });
  return new Response(JSON.stringify(updatedItem), { status: 200 });
}

export async function DELETE(req) {
  const { id: deleteId } = await req.json();
  items = items.filter((item) => item.id !== deleteId);
  return new Response(JSON.stringify({ message: "Item deleted" }), {
    status: 200,
  });
}

export async function PATCH(req) {
  const { id, isBlocked } = await req.json();
  items = items.map((item) => (item.id === id ? { ...item, isBlocked } : item));
  return new Response(JSON.stringify({ message: "Item updated" }), {
    status: 200,
  });
}
