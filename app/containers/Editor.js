import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import thumbnail from '../images/thumbnail.svg';

class Editor extends Component {
  state = {
    selectedFile: null,
    fileName: '',
    imageUploaded: false
  };

  componentDidMount() {
    this.loadImageOnCanvasBorad(thumbnail);
  }

  fileInput = React.createRef();

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
    this.setState({
      imageUploaded: false
    });
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    // Check for file
    if (file) {
      reader.readAsDataURL(file);

      reader.addEventListener(
        'load',
        () => {
          this.setState({
            selectedFile: reader.result,
            fileName: file.name,
            imageUploaded: true
          });
          const { selectedFile } = this.state;
          this.loadImageOnCanvasBorad(selectedFile);
        },
        false
      );
    }
  };

  applyEffect = effectName => {
    const { imageUploaded } = this.state;
    if (!imageUploaded) {
      return;
    }
    window.Caman('canvas', result => {
      result[effectName]().render();
      // result.herMajesty().render();
    });
  };

  resetEffects = () => {
    const { imageUploaded } = this.state;
    if (!imageUploaded) {
      return;
    }
    const { selectedFile } = this.state;
    this.loadImageOnCanvasBorad(selectedFile);
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
