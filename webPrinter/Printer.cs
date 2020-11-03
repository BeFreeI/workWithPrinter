using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using NiceLabel.SDK;

namespace webPrinter {
    class Printer {

        private void initPrinter() {
            try {
                string sdkFilesPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "..\\..\\..\\SDKFiles");
                if (Directory.Exists(sdkFilesPath)) {
                    PrintEngineFactory.SDKFilesPath = sdkFilesPath;
                }

                PrintEngineFactory.PrintEngine.Initialize();
            }
            catch (SDKException exception) {

            }
        }

        public Printer() {
            initPrinter();
        }

        private String pathToSamples = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "../../samples");

        public String[] GetSystemPrinters() {
            return (from el in PrintEngineFactory.PrintEngine.Printers select el.Name).ToArray();
        }

        public String[] GetAllSamplesNames() {
            return (from el in Directory.GetFiles(pathToSamples, "*.nlbl") select Path.GetFileName(el)).ToArray();
        }

        public void PrintSample(String sampleName, String printerName, Dictionary<String, String> atributes, int numberOfCopies) {
            ILabel lable = PrintEngineFactory.PrintEngine.OpenLabel(pathToSamples + "/" + sampleName);

            lable.PrintSettings.PrinterName = printerName;
            foreach (var atribut in atributes) {
                lable.Variables[atribut.Key].SetValue(atribut.Value);
            }
            lable.Print(numberOfCopies);
        }

        public Dictionary<String, String> getSampleAtributes(String sampleName) {
            ILabel lable = PrintEngineFactory.PrintEngine.OpenLabel(pathToSamples + "/" + sampleName);
            Dictionary<String, String> atributes = new Dictionary<string, string>(lable.Variables.Count);
            foreach (var atribute in lable.Variables) {
                atributes.Add(atribute.Name, atribute.Description);
            }
            return atributes;
        }

    }
}
