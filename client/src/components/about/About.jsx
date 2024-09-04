import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Email, LinkedIn } from '@mui/icons-material';

const Image = styled('img')({
    width: '100%',
    height: '61vh',
    objectFit: 'cover'
});

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: grey;
`;

const About = () => {
    const url = 'https://www.wallpapertip.com/wmimgs/160-1606072_sea.jpg';

    return (
        <Box>
            <Image src={url} alt="post" />
            <Wrapper>
                <Typography variant="h3">Garv Kadia</Typography>
                <Text variant="h5">I'm a Software Developer based in India.
                    I've built websites.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/garv0439" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.linkedin.com/in/garv-kadia-21744823a/" color="inherit" target="_blank">
                            <LinkedIn />
                        </Link>
                    </Box>
                    or send me an Email
                    <Link href="mailto:garvkadia@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;
