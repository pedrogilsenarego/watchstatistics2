import { whatImage } from "src/Utils/gamyfication";

const Parts = ( p: any,
  pos: number,) => {
  return{
    id: pos,
    name:p.substring(1),
    preview: whatImage(p.substring(1))
  }
}

export const mapParts = (parts: any) => {
  return {
    rows: parts.map((p: any, pos: number) =>
      Parts(p, pos)
    ),
  };
};
