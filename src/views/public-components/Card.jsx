export function HorizontalCard({ title, image, content, onClick }) {
    return ( 
        <div className="card m-2" style={{minWidth: 200,maxWidth: 540, cursor: 'pointer'}} onClick={onClick}>
            <div className="row g-0">
                {image?
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img src={image} className="img-fluid rounded-start" />
                    </div>
                : null
                }
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text" style={{overflow: 'hidden', maxHeight: 150}}>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function VerticalCard({ title, image, content, onClick  }){
    return (
        <div 
            className="card m-3" 
            onClick={onClick} 
            style={{maxWidth: 450, height: 350, overflow: 'hidden', cursor: 'pointer'}}
        >
            {image? <img src={image} className="card-img-top" alt={title} style={{maxHeight: '200px', objectFit: 'cover'}}/>
            : ''
            }
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    )
}