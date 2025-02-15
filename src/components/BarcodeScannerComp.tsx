import React, { useEffect, useState } from "react";
import {
  BarcodeScanner,
  BarcodeFormat,
  LensFacing,
} from "@capacitor-mlkit/barcode-scanning";
// import { Torch } from '@capawesome/capacitor-torch';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeOutline, flashlightOutline } from "ionicons/icons";
import "./BarcodeScannerComponent.css";
type Props = {
  isScannerVisisble: boolean;
  onClose: () => void;
  onScanSuccess: (code: string) => void;
  continousScan: boolean;
  guestQuantity: number;
};

const BarcodeScannerComp = ({
  isScannerVisisble,
  onScanSuccess,
  onClose,
  continousScan,
  guestQuantity,
}: Props) => {
  const [PermissionState, setPermissionState] = useState<string>("");
  const checkPermissions = async () => {
    const { camera } = await BarcodeScanner.checkPermissions();
    console.log("BS:camera-checkpermission:", camera);
    setPermissionState(camera);
    return camera;
  };

  const requestPermissions = async () => {
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log("BS:camera-requestpermission:", camera);
    setPermissionState(camera);
    return camera;
  };
  useEffect(() => {
    startScan();
  }, []);

  const startScan = async () => {
    // The camera is visible behind the WebView, so that you can customize the UI in the WebView.
    // However, this means that you have to hide all elements that should not be visible.
    // You can find an example in our demo repository.
    // In this case we set a class `barcode-scanner-active`, which then contains certain CSS rules for our app.

    document.querySelector("body")?.classList.add("barcode-scanner-active");
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      if (!camera) {
        console.error("BS:camera-Camera permission denied");
        return;
      }

      // Add the `barcodeScanned` listener

      const listener = await BarcodeScanner.addListener(
        "barcodesScanned",
        async (result) => {
          console.log("BS:camera", JSON.stringify(result.barcodes[0].displayValue));
          onScanSuccess(result.barcodes[0].displayValue)
          if (continousScan) return;
          stopScan();
        }
      );
      // Start the barcode scanner
      await BarcodeScanner.startScan();
    } catch (error) {
      console.error("BS:camera-Error during scan:", error);
    }
  };
  const stopScan = async () => {
    // Make all elements in the WebView visible again
    document.querySelector("body")?.classList.remove("barcode-scanner-active");
    // Remove all listeners
    await BarcodeScanner.removeAllListeners();
    // Stop the barcode scanner
    await BarcodeScanner.stopScan();
    onClose();
  };
  const scan = async () => {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode],
    });
    return barcodes;
  };

  return (
    <IonPage className="barcode-scanner-modal">
      <IonContent className="scanner-content">
        {/* Overlay UI */}
        <div className="scanner-overlay">
          {/* Close Button */}
          <IonButton className="close-button" onClick={stopScan}>
            <IonIcon icon={closeOutline} />
          </IonButton>

          {/* Torch Toggle Button */}
          <IonButton className="torch-button">
            <IonIcon icon={flashlightOutline} />
          </IonButton>

          {/* Scanning Frame */}
          <div className="scanning-frame">
            <div className="frame"></div>
            <p className="instruction">Align the barcode within the frame</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BarcodeScannerComp;
