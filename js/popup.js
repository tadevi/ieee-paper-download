// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

$('#download').click(function (element) {
  chrome.tabs.getSelected(null, function (tab) {
    const tablink = tab.url;
    const formdata = new FormData();

    formdata.append("request", tablink);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    }

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const targetUrl = 'https://sci-hub.tw'

    $('#spinner').addClass("fa-circle-o-notch fa-spin")
    $('#download').off('click')
    fetch(proxyUrl + targetUrl, requestOptions)
      .then(response => response.text())
      .then(data => {
        const url = data.match(/https.*\.pdf/)
        if (url.length > 0) {
          setTimeout(()=>window.open(url[0]),500)
        }
        else {
          alert('File not found!')
        }
      })
      .catch(e => {
        alert(e)
      })
      .finally(() => {
        $('#spinner').removeClass("fa-circle-o-notch fa-spin")
        $('#text').text('Finished!')
      })
  });
})