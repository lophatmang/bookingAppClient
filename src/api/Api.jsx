export async function loaderCity() {
  const res = await fetch(
    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/hotel/city`
  );
  const data = await res.json();
  return data;
}
