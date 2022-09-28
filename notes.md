*** INCOTERM PAGE ORIGINAL 
<h1>Inco-Terms</h1>

<h2>Inco-Terms: International Commercial Terms</h2>

<b>
  Standardize Terminologies that clarify the terms between the buyers and sellers
  from their purchase contracts. In this case, we will only explain about Seaway Transportation
  with the five most popular widely-used incoterms.
</b>
<div>
  <span>Responsibilities / Obligations</span>
  <br>
  <span>Buyer</span>
  <span>Seller</span>
</div>

<div>
  <button>
    <a href="/exw">EXW</a>
  </button>
  <button>
    <a href="/fob">FOB</a>
  </button>
  <button>
    <a href="/cif">CIF</a>
  </button>
  <button>
    <a href="/dap">DAP</a>
  </button>
  <button>
    <a href="/ddp">DDP</a>
  </button>
</div>

<img src="/SHIPPING-PROCESS.png" alt="shipping-process">

<section>  Who Pays for These? </section>
<% myCosts.forEach((cost, index) => { %>
  <li><%= cost.name %> : <%= cost.type %></li>
  <li><img src="" alt=""></li>
<% })  %> 

<div>
  <button><a href="/">Home</a></button>
</div>
***************

<h2> Simply SupplyChain News</h2>

<div class="well">
  <form method="POST" action="./news/search">
      <input name="searchTerm" type="text" placeholder="Type imports or exports">
      <button class="btn btn-primary" type="submit">Search News</button>
  </form>
</div>

<div class="row">
  <div class="col-sm-8">
    <div class="row">
      <div class="col-xs-12">
        <img class="hero" src="">
      </div>
    </div>
    <h2>Latest News</h2>
    
    <% if(news && Array.isArray(news) && news.length > 0) {%> 
    <% news.forEach(function(a) { %>
      <div class="well">
        <h2>
          <a href="/news/<%= a._id %>"><%= a.title %></a>
          <p><%= a.summary %> </p>
          <small>by <%= a.author %></small>
        </h2>
        <p>
          <strong><%= a.published_date.split(' ')[0] %></strong>
        </p>
        <form action="./favorites" method="POST">
          <input type="text" name="title" hidden value="<%= a.title%>">
          <input type="text" name="summary" hidden value="<%= a.summary%>">
          <input type="text" name="author" hidden value="<%= a.author%>">
          <input type="text" value="<%= currentUser.id %>" name="userID" hidden>
          <button type="submit"> Add to Favorites </button>
        </form>
      </div>
    <% }) %>
    <% } %> 

  </div>
  <div class="col-sm-4">
    <h2>About</h2>
    <p>Simply SupplyChain is a.</p>
  </div>
</div>

