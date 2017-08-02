import React from 'react';
import {connect} from 'react-redux';
import {removeProduct,sortProducts} from '../actions/products';
import * as CRITERIA from '../constants/Criteria';

const Products = ({isFetching,criteria,error,products,remove,sort}) => {

  const onRemove = (product,e) => {
    remove(product);
    e.stopPropagation();
  }

  const onDetail = (product) => {
    console.log('detail')
  }

  const onSort = (c) => {
    sort(c);
  }

  return (
    <div className="section section-grey pt-0" style={{minHeight:'100vh'}}>
      <nav className="navbar navbar-toggleable-md bg-white sticky-top" style={{boxShadow:'none'}}>
        <div className="container text-center">
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav">
              {CRITERIA.ALL.map((c) =>
                <li className={'nav-item' + (criteria === c ? ' active' : '')} key={c} onClick={onSort.bind(this,c)}>
                    <a className="nav-link" href="javascript:;">{c}</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container text-center">
        {isFetching && 
          <h5><i className="now-ui-icons loader_gear spin"></i></h5>
        }
        {error &&
          <h5 className="text-danger">{error}</h5>
        }
        {products.size === 0 && 
          <h5 className="description">Your products list is empty ...</h5>
        }
      </div>
      <div className="d-flex align-items-center">
        <table className="table table-responsive">
          <tbody>
            <tr>
            {products.map((product) => 
              <td key={product.url}>
                <div className="card card-product" key={product.url} onClick={onDetail.bind(this,product)}>
                  <div className="card-header">
                    <span className="btn btn-primary btn-simple btn-round">{product.prices.currency} {product.prices.final}</span>
                    <button className="btn btn-default btn-icon btn-icon-mini btn-round float-right" onClick={onRemove.bind(this,product)}>
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                  </div>
                  <img className="card-img-top" src={product.images[0]} alt={product.name}/> 
                  <div className="card-block pb-0">
                    <h5 className="card-title">{product.name}</h5>
                    <p>
                      <i className="now-ui-icons ui-2_favourite-28"></i> {product.scores.rating}
                    </p>
                    <p>
                      <b>Warranty</b>
                      <ul className="pl-3 m-0">
                        <li>
                          <span className="text-primary">{product.warranty.term}</span> {product.warranty.type}
                        </li>
                      </ul>
                    </p>
                    <p>
                      <b>Specifications</b>
                      <ul className="pl-3 m-0">
                        {product.attributes.map((attr) => 
                          <li key={attr}>{attr}</li>
                        )}
                      </ul>
                    </p>
                    {product.reviews.length > 0 ? <b>Reviews</b> : ''}
                  </div>
                  <ul className="list-group list-group-flush">
                    {product.reviews.map((r) => 
                      <li className="list-group-item" key={r.by + r.title}>
                        <b>{r.by} - <i className="now-ui-icons ui-2_favourite-28"></i> {r.stars}</b>
                        {r.content}
                      </li>
                    )}
                  </ul>
                  

                  <div className="card-footer">
                    <a className="btn btn-success btn-icon btn-icon-mini btn-round">
                      <i className="now-ui-icons ui-2_favourite-28"></i>
                    </a>
                    &nbsp;{product.scores.total_rating}&nbsp;&nbsp;
                    <a className="btn btn-info btn-icon btn-icon-mini btn-round">
                      <i className="now-ui-icons ui-2_chat-round"></i>
                    </a>
                    &nbsp;{product.scores.total_review}&nbsp;&nbsp;
                    <a className="btn btn-primary float-right" href={product.url} target="_blank">Buy</a>
                  </div>
                </div>
              </td>
            )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => {

  let latest = state.products[0];

  return {
    products : latest.products,
    isFetching: latest.isFetching,
    error: latest.error,
    criteria: latest.criteria
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove:(product) => {
      dispatch(removeProduct(product));
    },
    sort:(criteria) => {
      dispatch(sortProducts(criteria));
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)
