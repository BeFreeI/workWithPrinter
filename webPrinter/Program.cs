using System;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace webPrinter {
    class HttpServer {
        public static HttpListener listener;
        public static string[] url = {
            @"http://localhost:8000/"
        };

        public static async Task HandleIncomingConnections() {
            bool runServer = true;

            const string GET = "GET",
                    POST = "POST";

            const string PRINTER = "/printers",
                SAMPLES = "/samples",
                SAMPLES_ATRIBUT = "/sample/show"
            ;

            var jss = new JavaScriptSerializer();


            Printer printer = new Printer();

            while (runServer) {
                HttpListenerContext ctx = await listener.GetContextAsync();

                HttpListenerRequest req = ctx.Request;
                HttpListenerResponse resp = ctx.Response;

                switch (req.HttpMethod) {
                    case GET: {
                            switch (req.Url.AbsolutePath) {
                                case PRINTER: {
                                        byte[] data = Encoding.UTF8.GetBytes(jss.Serialize(printer.GetSystemPrinters()));
                                        resp.ContentType = "application/json";
                                        resp.ContentEncoding = Encoding.UTF8;
                                        resp.ContentLength64 = data.LongLength;
                                       
                                        await resp.OutputStream.WriteAsync(data, 0, data.Length);
                                        resp.Close();

                                        break;
                                    }
                                case SAMPLES: {
                                        byte[] data = Encoding.UTF8.GetBytes(jss.Serialize(printer.GetAllSamplesNames()));
                                        resp.ContentType = "application/json";
                                        resp.ContentEncoding = Encoding.UTF8;
                                        resp.ContentLength64 = data.LongLength;

                                        await resp.OutputStream.WriteAsync(data, 0, data.Length);
                                        resp.Close();

                                        break;
                                    }
                            }
                            break;
                        }
                    case POST:
                        switch(req.Url.AbsolutePath) {
                            case SAMPLES_ATRIBUT: {
                                    System.IO.Stream body = req.InputStream;
                                    System.Text.Encoding encoding = req.ContentEncoding;
                                    System.IO.StreamReader reader = new System.IO.StreamReader(body, encoding);

                                    string sample = reader.ReadToEnd();
                                    byte[] data = Encoding.UTF8.GetBytes(jss.Serialize(printer.getSampleAtributes(sample)));
                                    resp.ContentType = "application/json";
                                    resp.ContentEncoding = Encoding.UTF8;
                                    resp.ContentLength64 = data.LongLength;

                                    await resp.OutputStream.WriteAsync(data, 0, data.Length);
                                    resp.Close();

                                    break;
                                }
                            case PRINTER: {
                                    System.IO.Stream body = req.InputStream;
                                    System.Text.Encoding encoding = req.ContentEncoding;
                                    System.IO.StreamReader reader = new System.IO.StreamReader(body, encoding);
                                    string info = reader.ReadToEnd();
                                    var atributes = jss.Deserialize<Dictionary<string, string>>(info);
                                    String printerName = atributes["printer"],
                                        sampleName = atributes["sample"];
                                    atributes.Remove("printer");
                                    atributes.Remove("sample");
                                    printer.PrintSample(sampleName, printerName, atributes, 1);

                                    byte[] data = Encoding.UTF8.GetBytes("ok");
                                    resp.ContentType = "text/plain";
                                    resp.ContentEncoding = Encoding.UTF8;
                                    resp.ContentLength64 = data.LongLength;

                                    await resp.OutputStream.WriteAsync(data, 0, data.Length);
                                    resp.Close();

                                    break;
                                }
                        }
                        break;
                }
            }
        }


        public static void Main(string[] args) {
            listener = new HttpListener();
            foreach (String uri in url) {
                listener.Prefixes.Add(uri);
            }
            listener.Start();
            Console.WriteLine("Listening for connections on {0}", url);

            Task listenTask = HandleIncomingConnections();
            listenTask.GetAwaiter().GetResult();

            listener.Close();
        }
    }
}
