import "./product-loading.css";

export default function ProductLoading() {
    return (

        <article className="product-loading is-loading">
            <div className="product-loading-img">
            </div>
            <div className="product-loading-info">
                <h1 className="info-title"></h1>
                <p className="info-id"></p>
            </div>
        </article>
    )
}