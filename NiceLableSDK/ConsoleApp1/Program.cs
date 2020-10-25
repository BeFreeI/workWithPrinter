using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using NiceLabel.SDK;

namespace ConsoleApp1 {
    class Program {
        static void Main(string[] args) {
            try {
                string sdkFilesPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "..\\..\\..\\SDKFiles");

                if (Directory.Exists(sdkFilesPath)) {
                    PrintEngineFactory.SDKFilesPath = sdkFilesPath;
                }

                PrintEngineFactory.PrintEngine.Initialize();
            }
            catch (SDKException exception) {

            }
            ILabel label = PrintEngineFactory.PrintEngine.OpenLabel(args[0]);
            label.PrintSettings.PrinterName = args[2];
            label.Variables["value"].SetValue(args[1]);
            label.Print(1);
        }
    }
}
