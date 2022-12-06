import React, { useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, _ } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { format, differenceInDays } from "date-fns";
import es from "date-fns/locale/es";
import Layouts from "components/Layouts";
import Image from "next/image";
import { getReserveByCustomer } from "../services/reserves/reserve";
import { useState } from "react";
import { h, html } from "gridjs";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [isToken, setIsToken] = useState(false)

  const row = (reserves) =>
    reserves
      .map((reserva) => [
        reserva._id,
        reserva.reserveNumber,
        reserva.status,
        reserva.initialDate
          ? format(new Date(reserva.initialDate), "dd/MM/yyyy H:mm b", {
              locales: es,
            })
          : "N/A",
        reserva.finalDate
          ? format(new Date(reserva.finalDate), "dd/MM/yyyy H:mm b", {
              locales: es,
            })
          : "N/A",
        null,
      ])
      .reverse();
  const [data, setData] = useState([]);

  const getToken = () => {
    const token = localStorage.getItem("token");
    if(token) {
      setIsToken(true)
    } else {
      setIsToken(false)
    }
  };

  const getAllReserves = async () => {
    const user = localStorage.getItem("userCurrent");
    if(!user) {
      return
    }
    const { id, slug } = JSON.parse(user);
    const token = localStorage.getItem("token");
    try {
      const response = await getReserveByCustomer(id, token);

      const dataJson = await response.json();

      setData(row(dataJson?.data.customer.reserve));
      const rows = [];
    } catch (error) {
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    getAllReserves();
  }, []);

  return (
    <Layouts title={"Mis Reservas"}>
      <main className="container-fluid bookings">
        <div className="container vh-100">
          {isToken ? (
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
                        hidden: true,
                      },
                      {
                        id: "reserveNumber",
                        name: "No. Reserva",
                      },
                      { id: "status", name: "Estado" },
                      {
                        id: "initialDate",
                        name: "Fecha Inicial",
                        formatter: (cell) => `${cell}`,
                      },
                      {
                        id: "finalDate",
                        name: "Fecha Fin",
                        formatter: (cell) => `${cell}`,
                      },
                      {
                        name: "Actions",
                        formatter: (cell, row) => {
                          return h(
                            "button",
                            {
                              className:
                                "py-2 mb-4 px-4 border rounded-md text-white btn btn-movebike contained",
                              onClick: () =>
                                router.push(`/reserva/${row.cells[0].data}`),
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
          ) : (
            <h1>Inicia sesión</h1>
          )}
        </div>
      </main>
    </Layouts>
  );
}
