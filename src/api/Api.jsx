export async function loaderCity() {
  const res = await fetch("http://localhost:5000/hotel/city");
  const data = await res.json();
  return data;
}
