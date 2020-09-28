#include <node.h>
#include <iostream>

using namespace std;

namespace ReturnObjectAndFuntionDemo {
  using v8::Function;
  using v8::FunctionTemplate;
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Object;
  using v8::String;
  using v8::Value;
  using v8::Local;

  void getPerson (const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    /* 创建对象 */
    Local<Object> obj = Object::New(isolate);
    /* 设置对象属性，Set(key, value) */
    obj->Set(
      String::NewFromUtf8(isolate, "firstname"),
      String::NewFromUtf8(isolate, "Java")
    );
    obj->Set(
      String::NewFromUtf8(isolate, "lastname"),
      String::NewFromUtf8(isolate, "Script")
    );
    /* 将对象返回给JavaScript */
    args.GetReturnValue().Set(obj);
  }

  void init (Local<Object> exports) {
    NODE_SET_METHOD(exports, "getPerson", getPerson);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}