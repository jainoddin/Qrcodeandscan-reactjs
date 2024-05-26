import './App.css';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button, colors } from '@material-ui/core';
import QRCode from 'qrcode';
import { useState, useRef,useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

function App() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const qrRef = useRef(null);
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const fileInputRef = useRef(null);
  const [imageUrll, setImageUrll] = useState('');

  const generateQrcode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleErrorFile = (error) => {
    console.error(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
      console.log(result)
    }
  };

  const scanImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      qrRef.current.scanImage(result);
    };

    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      scanImage(file);
    }
  };

  const onScanFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file && qrRef.current) {
        scanImage(file);
      }
    };
  };

  const handleErrorWebCam = (error) => {
    console.error(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };

  const handleScan = (result) => {
    if (result) {
      console.log('QR code result:', result.text);
    }
  };

  const handleError = (error) => {
    console.error('QR code error:', error);
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>Generate, Download & Scan QR Code with React js</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12}>
              <TextField label="Enter Text Here" value={text} onChange={(e) => setText(e.target.value)} />
              <Button className={classes.btn} variant="contained" color="primary" onClick={generateQrcode}>
                Generate
              </Button>
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12}>
            <Button className={classes.btn} variant='contained' color='secondary' onClick={onScanFile}>Scan QR CODE</Button>
            {/* get qrcode when i add onScanFile*/}
           
            <h3>Scanned Code : {scanResultFile}</h3>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12}>
            <h3>Qr Code Can by Web Cam</h3>
              <QrReader
                delay={300}
                style={{ width: '100%', height: '100%' }}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
              />
              <h3>Scanned By WebCam Code : {scanResultWebCam}</h3>

             
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

export default App;
