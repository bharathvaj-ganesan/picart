import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/lab/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import thumbnail from '../images/thumbnail.svg';

class Editor extends Component {
  state = {
    selectedFile: null,
    fileName: '',
    imageUploaded: false,
    processing: false,
    hue: 0,
    contrast: 0,
    vibrance: 0,
    sepia: 0,
    saturation: 0,
    brightness: 0,
    noise: 0,
    stackBlur: 0
  };

  componentDidMount() {
    this.loadImageOnCanvasBorad(thumbnail);
  }

  fileInput = React.createRef();

  maxWidth = 500;

  maxHeight = 500;

  effects = [
    {
      label: 'vintage',
      name: 'vintage'
    },
    {
      label: 'Glowing Sun',
      name: 'glowingSun'
    },
    {
      label: 'Sunrise',
      name: 'sunrise'
    },
    {
      label: 'Love',
      name: 'love'
    },
    {
      label: 'Nostalgia',
      name: 'nostalgia'
    },
    {
      label: 'Concentrate',
      name: 'concentrate'
    },
    {
      label: 'Pinhole',
      name: 'pinhole'
    },
    {
      label: 'Old Boot',
      name: 'oldBoot'
    },
    {
      label: 'Grungy',
      name: 'grungy'
    },
    {
      label: 'Cross Process',
      name: 'crossProcess'
    },
    {
      label: 'Jarques',
      name: 'jarques'
    },
    {
      label: 'Sin City',
      name: 'sinCity'
    }
  ];

  loadImageOnCanvasBorad(imageFile) {
    // Create image
    const img = new Image();
    // Set image src
    img.src = imageFile;
    // On image load add to canvas
    img.onload = () => {
      const ctx = this.canvasBoard.getContext('2d');
      this.canvasBoard.width = `${img.width}`;
      this.canvasBoard.height = `${img.height}`;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      this.canvasBoard.removeAttribute('data-caman-id');
    };
  }

  onFileUpload = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    // Check for file
    if (file) {
      this.setState({
        imageUploaded: false
      });
      reader.readAsDataURL(file);

      reader.addEventListener(
        'load',
        () => {
          this.setState({
            selectedFile: reader.result,
            fileName: file.name,
            imageUploaded: true,
            hue: 0,
            contrast: 0,
            vibrance: 0,
            sepia: 0,
            saturation: 0,
            brightness: 0,
            noise: 0,
            stackBlur: 0
          });
          const { selectedFile } = this.state;
          this.loadImageOnCanvasBorad(selectedFile);
        },
        false
      );
    }
  };

  applyFilter = value => {
    const { imageUploaded, selectedFile } = this.state;
    if (!imageUploaded) {
      return;
    }
    this.setState(value);
    window.Caman('canvas', selectedFile, result => {
      const [key] = Object.keys(value);
      result[key](value[key]).render();
    });
  };

  applyEffect = effectName => {
    const { imageUploaded, selectedFile } = this.state;
    if (!imageUploaded) {
      return;
    }
    window.Caman('canvas', selectedFile, result => {
      result.revert();
      this.setState({
        processing: true
      });
      this.canvasBoard.style.visibility = 'hidden';
      result[effectName]().render(() => {
        // Create image
        const img = new Image();
        // Set image src
        img.src = selectedFile;
        // On image load add to canvas
        img.onload = () => {
          let ratio = 1;
          let { width, height } = img;
          if (width > this.maxWidth) {
            ratio = this.maxWidth / width; // get ratio for scaling image
            height *= ratio; // Reset height to match scaled image
            width *= ratio; // Reset width to match scaled image
          }

          // Check if current height is larger than max
          if (height > this.maxHeight) {
            ratio = this.maxHeight / height; // get ratio for scaling image
            width *= ratio; // Reset width to match scaled image
            height *= ratio; // Reset height to match scaled image
          }
          this.canvasBoard.style.width = `${width}px`;
          this.canvasBoard.style.height = `${height}px`;
          this.canvasBoard.style.visibility = 'visible';
          this.setState({
            processing: false
          });
        };
      });
    });
  };

  resetEffects = () => {
    const { imageUploaded, selectedFile } = this.state;
    if (!imageUploaded) {
      return;
    }
    this.setState({
      hue: 0,
      noise: 0,
      contrast: 0,
      vibrance: 0,
      sepia: 0,
      saturation: 0,
      brightness: 0,
      stackBlur: 0
    });
    window.Caman('canvas', selectedFile, result => {
      result.revert();
    });
  };

  saveImage = () => {
    const { imageUploaded } = this.state;
    if (!imageUploaded) {
      return;
    }
    const { fileName } = this.state;
    const fileExtension = fileName.split('.')[1];

    const newFilename = `${fileName.substring(
      0,
      fileName.length - 4
    )}-edited.${fileExtension}`;

    // New mouse event
    const e = new MouseEvent('click');
    // Create link
    const link = document.createElement('a');

    // Set props
    link.download = newFilename;
    link.href = this.canvasBoard.toDataURL('image/jpeg', 0.8);
    // Dispatch event
    link.dispatchEvent(e);
  };

  render() {
    const { processing } = this.state;
    const {
      hue,
      contrast,
      vibrance,
      sepia,
      saturation,
      brightness,
      stackBlur,
      noise
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={8}>
          <input
            type="file"
            accept="image/*"
            onChange={this.onFileUpload}
            style={{ display: 'none' }}
            ref={ref => {
              this.uploadInput = ref;
            }}
          />
          <div style={{ display: 'flex' }}>
            {processing ? (
              <CircularProgress
                size={100}
                thickness={4}
                variant="indeterminate"
                style={{
                  position: 'fixed',
                  left: 'calc(100% - 67%)',
                  top: 'calc(100% - 70%)'
                }}
              />
            ) : (
              ''
            )}

            <canvas
              className="canvasBoard"
              width={500}
              height={500}
              ref={ref => {
                this.canvasBoard = ref;
              }}
              onClick={() => {
                this.uploadInput.click();
              }}
            />
          </div>
          <Grid container>
            <Grid item xs={12}>
              <p className="text--center">Magic Effects</p>
              <Grid container spacing={8}>
                {this.effects.map(effect => (
                  <Grid item xs={3} className="text--center" key={effect.name}>
                    <Button
                      color="primary"
                      onClick={() => {
                        this.applyEffect(effect.name);
                      }}
                    >
                      {effect.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item xs={12} style={{ width: '100%' }} className="filters">
              <Tooltip title={hue} placement="top">
                <div>
                  Hue
                  <Slider
                    value={hue}
                    aria-labelledby="label"
                    min={0}
                    max={300}
                    onChange={(event, value) => {
                      this.applyFilter({
                        hue: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={contrast} placement="top">
                <div>
                  Contrast
                  <Slider
                    value={contrast}
                    aria-labelledby="label"
                    min={-80}
                    max={80}
                    onChange={(event, value) => {
                      this.applyFilter({
                        contrast: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={stackBlur} placement="top">
                <div>
                  StackBlur
                  <Slider
                    value={stackBlur}
                    aria-labelledby="label"
                    min={0}
                    max={10}
                    onChange={(event, value) => {
                      this.applyFilter({
                        stackBlur: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={noise} placement="top">
                <div>
                  Noise
                  <Slider
                    value={noise}
                    aria-labelledby="label"
                    min={0}
                    max={100}
                    onChange={(event, value) => {
                      this.applyFilter({
                        noise: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={vibrance} placement="top">
                <div>
                  Vibrance
                  <Slider
                    value={vibrance}
                    aria-labelledby="label"
                    min={0}
                    max={400}
                    onChange={(event, value) => {
                      this.applyFilter({
                        vibrance: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={sepia} placement="top">
                <div>
                  Sepia
                  <Slider
                    value={sepia}
                    aria-labelledby="label"
                    min={0}
                    max={100}
                    onChange={(event, value) => {
                      this.applyFilter({
                        sepia: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={brightness} placement="top">
                <div>
                  Brightness
                  <Slider
                    value={brightness}
                    min={-50}
                    max={50}
                    aria-labelledby="label"
                    onChange={(event, value) => {
                      this.applyFilter({
                        brightness: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
              <Tooltip title={saturation} placement="top">
                <div>
                  Saturation
                  <Slider
                    value={saturation}
                    min={-50}
                    max={50}
                    aria-labelledby="label"
                    onChange={(event, value) => {
                      this.applyFilter({
                        saturation: value
                      });
                    }}
                  />
                </div>
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Button
                size="large"
                className="btn__download"
                variant="contained"
                fullWidth
                onClick={this.saveImage}
              >
                Download
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                className="btn__reset"
                variant="contained"
                fullWidth
                onClick={this.resetEffects}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default Editor;
