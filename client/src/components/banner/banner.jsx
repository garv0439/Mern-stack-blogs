import { styled, Box, Typography } from '@mui/material';

const ImageWrapper = styled(Box)`
  width: 100%;
  background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const LogoImage = styled('img')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: auto;
  height: 50%;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  color: DarkBlue;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 20px;
  background: Cyan;
  border-radius: 15px;
  padding: 3px;
  color: DarkBlue;
`;

const Banner = () => {
  const url = '/logo.png';
  return (
    <ImageWrapper>
      <LogoImage src={url} alt="logo" />
    </ImageWrapper>
  );
}

export default Banner;
