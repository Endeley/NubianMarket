import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Welcome to Nubian Market Place',
    description: 'We sell the best African made products',
    keywords: 'electronics, shoes , clothes, men, women, children, cheep electronics, hand made, organic, african products',
};
export default Meta;
