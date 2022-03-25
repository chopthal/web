import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => (
            <>
                <header>
                    icluebio APP
                </header>
                <Link to='/lunch'>
                <button>
                    Lunch Time!
                </button>
                </Link>
                <Link to='/login'>
                <button>
                    Login
                </button>
                </Link>

            </>
    );

export default Home;