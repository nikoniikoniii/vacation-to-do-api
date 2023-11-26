import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import locationOnOutlined from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles";
import LocationOnOutlined from "@material-ui/icons/LocationOnOutlined";

const Map = ({ setCoordinates, setBounds, coordinates, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyA1lDcK4VP0pZOTAhZslHSqYcb53LfIz84" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        //onChildClick={``}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlined
                color="primary"
                fontSize="large"
              ></LocationOnOutlined>
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.Typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
