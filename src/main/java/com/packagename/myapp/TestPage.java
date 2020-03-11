/* Copyright (c) 2020, rola Security Solutions GmbH */

package com.packagename.myapp;

import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("test")
public class TestPage extends VerticalLayout
{

  public TestPage()
  {
    // Layout Settings
    setSizeFull();

    SampleWebComponent webMap = new SampleWebComponent();
    add(webMap);
  }
}
