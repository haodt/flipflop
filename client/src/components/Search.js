import React from 'react';
import {connect} from 'react-redux';
import {updateUrl,submitUrl,duplicateUrl} from '../actions/search';
import {DOMAINS} from '../reducers/search';

const Search = ({value,products,isValidDomain,isDuplicate,submit,onChange}) => {

  const onSubmit = (e) => {
    e.preventDefault();
    if(isValidDomain){
      submit(value,products);
    }    
  }

  return (
    <div className="section text-center pb-0">
      <div className="container">
        <h2 className="title">Flip Flop</h2>
        <p className="description">Paste a link to get started with <b>Flip Flop</b>.</p>
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <form onSubmit={onSubmit}>
              <div className={'input-group form-group-no-border input-lg' + (!isValidDomain ? ' has-danger ' : '')}>
                <span className="input-group-addon">
                  <i className="now-ui-icons ui-1_zoom-bold"></i>
                </span>
                <input className={'form-control' + (!isValidDomain ? ' form-control-danger ' : '')} onChange={onChange} value={value}/>
              </div>
              <p>
                {!isValidDomain &&
                  <small>We only support {DOMAINS.join(', ')}</small>
                }
                {isDuplicate &&
                  <small>You have added the product from this url</small>
                }
              </p>
              <button className="btn btn-primary btn-round btn-lg" type="submit" disabled={isValidDomain && value !=='' ? '':'disabled'}>Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {

  let latest = state.search[0];
  return {
    value : latest.value,
    products: state.products[0].products,
    isDuplicate: latest.isDuplicate,
    isValidDomain: latest.isValidDomain
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit:(value,products) => {
      if (products.filter(p => p.url === value).length > 0) {
        return dispatch(duplicateUrl(value))
      }
      dispatch(submitUrl(value));
    },
    onChange:(e) => {
      dispatch(updateUrl(e.target.value))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
