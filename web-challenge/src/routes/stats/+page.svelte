<div class="flex-grow">
    <div class="flex justify-center">

        <button onclick={() => my_modal_1.showModal()} class="btn">Generate graph</button>
    </div>
</div>

<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <iframe src="https://drive.google.com/file/d/19o--nQvk1FY7bYc9njDSlyZgfXMb1xzF/preview" width="320" height="240" allow="autoplay"></iframe>
    <form method="dialog" class="modal-backdrop">    
      <button onclick={() => dispatch('close')} class="btn btn-primary">x</button>
    </form>
  </div>
</dialog>


