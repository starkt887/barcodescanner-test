import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import BarcodeScannerComp from "../components/BarcodeScannerComp";

const Home: React.FC = () => {
  const [isScannerVisisble, setisScannerVisisble] = useState(false);
  const [continousScan, setcontinousScan] = useState(false);
  const [guestQuantity, setguestQuantity] = useState(0);
  const [present]=useIonToast()
  const onScanSuccess = (code: string) => {
    console.log("BS:camera-home", code);
    present(`Scanned-success:${code}`,3000)
  };
  useEffect(() => {
    console.log("BS:camera-contineousScan:", continousScan);
  }, [continousScan]);

  return (
    <>
      {isScannerVisisble ? (
        <BarcodeScannerComp
          isScannerVisisble={isScannerVisisble}
          onClose={() => setisScannerVisisble(false)}
          onScanSuccess={onScanSuccess}
          continousScan={continousScan}
          guestQuantity={guestQuantity}
        />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="ion-padding">
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Blank</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonButton onClick={() => setisScannerVisisble(true)}>
              Scan barcode
            </IonButton>
            <IonToggle
              onIonChange={(e) => {
                setcontinousScan((prev) => !prev);
              }}
            >
              Continous Scan
            </IonToggle>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Home;
