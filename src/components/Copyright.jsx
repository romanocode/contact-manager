export default Copyright;

function Copyright() {
  const year = new Date().getFullYear();
  return <p> Todos los derechos reservados © {year} Romanocode</p>;
}