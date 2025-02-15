import React, { useEffect } from 'react'
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
// import { Torch } from '@capawesome/capacitor-torch';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { closeOutline } from "ionicons/icons";
import "./BarcodeScannerComponent.css";
type Props = { isScannerVisisble: boolean }

const BarcodeScannerComp = ({ isScannerVisisble }: Props) => {

  const checkPermissions = async () => {
    const { camera } = await BarcodeScanner.checkPermissions();
    console.log("BS:camera-checkpermission:",camera);
    
    return camera;
  };

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log("BS:camera-requestpermission:",camera);
    return camera;
  };
  useEffect(() => {
    requestPermissions()
    checkPermissions()
    // if (checkPermissions() === 'granted') {
    //   startScan()
    // }
    // else {
    //   requestPermissions()
    // }

    return () => {
      stopScan()
    }
  }, [checkPermissions])

  const startScan = async () => {
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    // Add the `barcodeScanned` listener
    const listener = await BarcodeScanner.addListener('barcodesScanned', async (result) => {
      console.log(result.barcodes);
    })

    // Start the barcode scanner
    await BarcodeScanner.startScan();
  };
  const stopScan = async () => {
    // Make all elements in the WebView visible again
    document.querySelector('body')?.classList.remove('barcode-scanner-active');

    // Remove all listeners
    await BarcodeScanner.removeAllListeners();

    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
  };
  const scan = async () => {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    return barcodes;
  };

  return (
    <IonPage id="background-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="ion-text-left" slot="start">
            Scan Barcode
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                // BarcodeScanner.showBackground();
                // BarcodeScanner.stopScan({ resolveScan: true });
                // onCancel();
                // document
                //   .querySelector("body")
                //   ?.classList.remove("scanner-active");
                // dispatch(barcodeScannerActions.setVisible(false)); //backup for handling unexpected scenario
              }}
            >
              {/* {Strings.CANCEL} */}
              <IonIcon slot="end" icon={closeOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        {/* {guestQuantity && guestQuantity > 0 ? (
          <IonToolbar color="light">
            <IonTitle size="small">{`${Strings.SCAN_ADDITIONAL_SS} ${guestQuantity} ${Strings.SS_CARD}`}</IonTitle>
          </IonToolbar>
        ) : (
          ""
        )} */}
      </IonHeader>

      <IonContent className="scan-conten">
        <div className="scanner-ui">
          <div className="container">
            {/* {isScanning && (
            <IonLoading
              isOpen={showLoading}
              message={"Checking in..."}
              duration={0}
            />
          )} */}
            <div className="barcode-scanner--area--container">
              <div className="relative ion-text-center">
                <IonText color="light">
                  <p>Scan Barcode in the boundary</p>
                </IonText>
              </div>
              <div className="square surround-cover">
                <div className="barcode-scanner--area--outer surround-cover">
                  <div className="barcode-scanner--area--inner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default BarcodeScannerComp