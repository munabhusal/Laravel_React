function PaginationLinks({meta, onPageChange}) {

  function onclick(ev, link){
    ev.preventDefault();
    if(!link.url){
      return;
    }else{
      onPageChange(link)
    }
  }

    return (
      <div className="PaginationLinks">
        <div className="row">
            <div className="col-md-3">
            <p>Showing {meta.from} to {meta.to} of {meta.total} results</p>
            </div>
            <div className="col-md-9">            
                <nav aria-label="...">
            <ul class="pagination">
                {meta.links.map((link)=>(
                  <>
                  <li class={"page-item" + (link.active ? ' active' : '')}>
                  <a class="page-link" href="#" onClick={ev => onclick(ev,link)}>
                  <span dangerouslySetInnerHTML={{__html : link.label}}></span>
                    <span class="sr-only">{link.active}</span>
                  </a>
                  </li>
                  </>
                ))}
            </ul>
            </nav>
            </div>
        </div>
      </div>
    )
  }
  
  export default PaginationLinks
  