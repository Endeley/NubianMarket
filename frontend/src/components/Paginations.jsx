import { Pagination } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import { NavLink } from 'react-router-dom';
//

const Paginations = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <NavLink key={x + 1} to={!isAdmin ? (keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`) : `/admin/productlist/${x + 1}`}>
                        <Pagination.Item as='span' active={x + 1 === page} className='mx-1'>
                            {x + 1}
                        </Pagination.Item>
                    </NavLink>
                ))}
            </Pagination>
        )
    );
};

export default Paginations;
