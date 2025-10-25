<!-- best / avg toggle -->
<div class="flex justify-center">
    <div class="btn">Best</div>
    <div class="btn">Avg</div>
</div>

<div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
      
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>10/1</th>
        <td>Best: 18.4</td>
        <td>+0.12</td>
        <td class="btn">View more</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>10/2</th>
        <td>Best: 7.9</td>
        <td>+0.12</td>
        <td class="btn">View more</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>10/3</th>
        <td>11.1</td>
        <td>+0.12</td>
        <td class="btn">View more</td>
      </tr>
      <!--row 4-->
      <tr> 
        <th>10/4</th> 
        <td>Best: 6.767</td>
        <td>+0.12</td>
        <td class="btn">View more</td> 
    </tbody>
  </table>
</div>


<!-- modal -->
 
<div class="modal-bg">
    <div class="modal-popup bg-secondary">
        <h1>Laptimes for 10/1</h1>
        <div>8.33'</div>
        <div>8.33'</div>
        <div>8.33'</div>
        <div>8.33'</div>
        <div>8.33'</div>
        <div>8.33'</div>
        <button class="btn btn-primary">x</button>
    </div>
</div>

<style>
    .mode{
        
    }
    .modal-bg.hidden {
        display: none;
    }

    .modal-bg {
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        background: rgba(0, 0, 0, 0.7);

        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    
    

    .modal-bg .modal-popup {
        padding: 20px;
    }

    .grid-1 {
        display: grid;
        grid-template-columns: auto 1fr auto auto;
    }

    .grid-1 > div {
        padding: 5px;
        margin: 1px;
    }

    .grid-1 .spans-row {
        grid-column: 1 / span 4;
        background: #eee;
    }

    .boxes {
        margin-top: 20px;
    }

    .box {
        border: 1px solid black;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;

        display: flex;
        justify-content: space-between;
    }

    .box > div {
        background: lightblue;
    }

    .box2 {
        border: 1px solid black;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
    }
</style>
