import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import BarcodeScannerComp from '../components/BarcodeScannerComp';

const Home: React.FC = () => {
  const [isScannerVisisble, setisScannerVisisble] = useState(false)
  return (
    <>
      {isScannerVisisble ?
        <BarcodeScannerComp isScannerVisisble={isScannerVisisble} /> :
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Blank</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonButton onClick={() => setisScannerVisisble(true)}>Scan barcode</IonButton>
          </IonContent>
        </IonPage>}
    </>

  );
};

export default Home;
