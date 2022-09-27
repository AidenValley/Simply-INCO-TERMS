  <div class="d-flex flex-row-reverse">
    <% if (!currentUser) {%>
      <ul class="p-2"><a href="/auth/signup">Signup</a></ul>
      <ul class="p-2"><a href="/auth/login">Login</a></ul>
    <% } else { %>
        <ul class="p-2"><a href="/auth/logout">Logout</a></ul>
        <ul class="p-2"><a href="/profile">Profile</a></ul>
    <% } %>
    </div>