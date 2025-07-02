export default Copyright;

function Copyright() {
  const year = new Date().getFullYear();
  return <p> © {year} Romanocode</p>;
}