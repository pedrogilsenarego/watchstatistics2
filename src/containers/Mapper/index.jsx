import { Typography, Grid, Container, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const data = [{ lat: 46.19557, lng: 6.133449, name: "Rolex.S.A." }];

const Mapper = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8}></Grid>
        <Grid item xs={12} md={4}>
          <Box style={{ marginTop: "120px" }}>
            <MapContainer
              style={{ height: "70vh", width: "70vh" }}
              center={[51.0, 19.0]}
              zoom={4}
              maxZoom={18}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {data &&
                data.map((item, pos) => {
                  return (
                    <Marker
                      key={pos}
                      position={[Number(item.lat), Number(item.lng)]}
                    >
                      <Popup>
                        <Typography>{item.name}</Typography>
                        <Typography
                          style={{ cursor: "pointer", color: "darkblue" }}
                        >
                          More information
                        </Typography>
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Mapper;
