package com.packagename.myapp;

import com.vaadin.flow.component.*;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

@Tag("my-component")
@NpmPackage(value = "sampler-component", version = "../../frontend/sampler-webcomponent/")
@JsModule("./integration.js")
public class SampleWebComponent extends Component implements HasSize
{

}
