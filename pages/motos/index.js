import React, { useEffect, useState } from "react";
import Layout from "components/Layouts";
import { getAllMotos } from "services/bikes/motos";
import SlideMotos from "../../components/home/SlideMotos";

export default function motos() {
    const [motos, setMotos] = useState([]);
  const getMotos = async () => {
    try {
      const response = await getAllMotos();
      setMotos(response.data.data.motos);
    } catch (error) {}
  };

  useEffect(() => {
    getMotos();
  }, []);
  return (
    <Layout title={"Motos"}>
      <main>
        <section className="container-fluid">
          <div className="container">
            <div className="row">
                <div>
                <h4>Vehiculos disponibles</h4>
                </div>
              <aside className="col-12 d-flex">
                
                <br />
                <div className="">
                    <label className="form-label">Buscar por nombre</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="ms-3">
                    <label className="form-label">Model</label>
                    <input type="text" className="form-control" />
                </div>
              </aside>
              {
                motos.map((moto) => <SlideMotos key={moto._id} model={moto.model} name={moto.name} price={moto.price} img={moto.keyImage} idMoto={moto._id} /> )
               }
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
