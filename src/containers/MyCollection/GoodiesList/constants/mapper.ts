const Parts = ( p: any,
  pos: number,) => {
  return{
    id: pos,
    name:p,

  }
}

export const mapParts = (parts: any) => {
  return {
    rows: parts.map((p: any, pos: number) =>
      Parts(p, pos)
    ),
  };
};