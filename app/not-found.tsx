import { BotonPrincipal, BotonSecundario, CabeceraPagina } from "@/components/ui";

export default function NoEncontrado() {
  return (
    <>
      <CabeceraPagina
        rotulo="Página no encontrada"
        titulo="Este camino no lleva a ningún lado"
        entrada="La página que buscas cambió de lugar o nunca existió. Desde el inicio llegas a todo."
      />
      <div className="contenedor flex flex-col gap-3 pb-20 sm:flex-row sm:flex-wrap sm:gap-4 md:pb-28">
        <BotonPrincipal href="/">Ir al inicio</BotonPrincipal>
        <BotonSecundario href="/horarios">Ver horarios</BotonSecundario>
      </div>
    </>
  );
}
