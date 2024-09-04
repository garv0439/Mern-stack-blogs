import { Grid } from '@mui/material';

//componentssss
import Banner from "../banner/banner"
import Categories from "./categories"
import Posts from './post/Posts';

const Home = () => {

    return (<>
        <Banner  />
        <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
                </Grid>
        </>

    )}

    export default Home