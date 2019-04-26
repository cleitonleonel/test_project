Vue.component('app_modal', {
  props:['id', 'classes'],
  template:
  `
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id" aria-hidden="true">
    <div :class="classes" role="document" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
					  <slot name="title">Title</slot>
          </h5>

          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body" style='padding-left:25px;padding-right:25px;'>
          <slot name="content"></slot>
        </div>

        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
  `,
});
