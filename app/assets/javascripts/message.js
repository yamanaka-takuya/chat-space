$(function(){
    function buildHTML(message){
      if ( message.image ) {
        let html =
          `<div class="MessageBox">
            <div class="MessageInfo">
              <div class="MessageInfo__userName">
                ${message.user_name}
              </div>
              <div class="MessageInfo__date">
                ${message.created_at}
              </div>
            </div>
            <div class="Message">
              <p class="Message__content">
                ${message.content}
              </p>
              <img class="Message__image" src="${message.image}">
            </div>
          </div>`
        return html;
      } else {
        let html =
        `<div class="MessageBox">
          <div class="MessageInfo">
            <div class="MessageInfo__userName">
              ${message.user_name}
            </div>
            <div class="MessageInfo__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
      };
    }
  
    $('.Form__contents').on('submit', function(e){
      // console.log("test")
      e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        let html = buildHTML(data);
        $('.main__MessageField').append(html);      
        $('form')[0].reset();
        $('.main__MessageField').animate({ scrollTop: $('.main__MessageField')[0].scrollHeight});
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    })
      .always(function(){
        $('.Form__submitBtn').removeAttr("disabled");
    });
  });
})