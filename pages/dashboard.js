import React, { useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import Layouts from "components/Layouts";
import Image from "next/image";
import { getReserveByCustomer } from "../services/reserves/reserve";
import { useState } from "react";

export default function Dashboard() {
  const tableRef = useRef(null);
  const wrapperRef = useRef(null);

  const row = (reserves) =>
    reserves.map((reserva) => [
      reserva.reserveNumber,
      reserva.status,
      reserva.initialDate,
      reserva.finalDate
    ]);
  const [data, setData] = useState([]);

  console.log(data);

  const [pageSize, setPageSize] = React.useState(5);

  const getAllReserves = async () => {
    const user = localStorage.getItem("userCurrent");
    const { id, slug } = JSON.parse(user);
    const token = localStorage.getItem("token");
    try {
      const response = await getReserveByCustomer(id, token);
      console.log(response.data.data.customer.reserve);
      //setReserves(response.data.data.customer.reserve);
      setData(row(response.data.data.customer.reserve));
      const rows = [];
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReserves();
  }, []);

  return (
    <Layouts title={'Mis Reservas'}>
      <main className="container-fluid bookings">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="bookings__title">Mis reservas</h1>
            </div>
            <div className="col-md-12 mx-auto">
              <div>
                <Grid
                  data={data}
                  columns={[
                    { id: "reserveNumber", name: "No. Reserva" },
                    { id: "status", name: "Estado" },
                    { id: "initialDate", name: "Fecha Inicial" },
                    { id: "finalDate", name: "Fecha Fin" },
                    { name: 'Actions'}
                  ]}
                  search={true}
                  sort={true}
                  pagination={{
                    enabled: true,
                    limit: 10,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layouts>
  );
}
