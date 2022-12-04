import React, { useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { format, differenceInDays } from "date-fns";
import Layouts from "components/Layouts";
import Image from "next/image";
import { getReserveByCustomer } from "../services/reserves/reserve";
import { useState } from "react";
import { h, html } from "gridjs";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router =useRouter()
  const tableRef = useRef(null);
  const wrapperRef = useRef(null);

  function formatDate(text) {
    return h('b', {}, text)
  }

  const row = (reserves) =>
    reserves.map((reserva) => [
      reserva._id,
      reserva.reserveNumber,
      reserva.status,
      reserva.initialDate,
      formatDate(reserva.finalDate),
      null
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
    <Layouts title={"Mis Reservas"}>
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
                    {
                      id: "_id",
                      hidden: true

                    },
                    {
                      id: "reserveNumber",
                      name: "No. Reserva",
                      
                    },
                    { id: "status", name: "Estado" },
                    {
                      id: "initialDate",
                      name: "Fecha Inicial",
                      formatter: (cell) => `Fechas: ${cell}`,
                    },
                    { id: "finalDate", name: "Fecha Fin" },
                    {
                      name: "Actions",
                      formatter: (cell, row) => {
                        return h(
                          "button",
                          {
                            className:
                              "py-2 mb-4 px-4 border rounded-md text-white btn btn-movebike contained",
                            onClick: () =>
                            router.push(`/reserva/${row.cells[0].data}`)
                          },
                          "Ver reserva"
                        );
                      },
                    },
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
