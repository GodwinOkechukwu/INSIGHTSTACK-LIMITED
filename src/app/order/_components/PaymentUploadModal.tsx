"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  FiX,
  FiHash,
  FiUploadCloud,
  FiTrash,
  FiCopy,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { BiSolidFilePdf } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import FormToast from "@src/components/Reusables/Toast/SigninToast";
import { getBankAccounts } from "@utils/endpoints";
import { useQuery } from "react-query";
import { APICall } from "@utils";
import { Skeleton } from "@heroui/react";

interface bankAccountsDataType {
  account_name: string;
  account_number: string;
  bank_name: string;
  sort_code: string;
  iban: string;
  bic: string;
  country_code: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "goods" | "shipping";
  orderId: string;
  onUpload: (file: File, ref: string, date: string) => void;
  isLoading: boolean;
}

const PaymentUploadModal = ({
  isOpen,
  onClose,
  type,
  orderId,
  onUpload,
  isLoading,
}: PaymentModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [ref, setRef] = useState("");
  const [date] = useState(new Date().toISOString().split("T")[0]);
  const [copied, setCopied] = useState(false);

  // --- FETCH DYNAMIC BANK DATA ---
  const { data: bankAccountsData, isLoading: isBankLoading } = useQuery(
    ["bank-accounts"],
    async () => {
      const response = await APICall(getBankAccounts, false, false);
      return response.data;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
      enabled: isOpen, // Only fetch when modal opens
    },
  );

  const activeBank: bankAccountsDataType | undefined =
    bankAccountsData?.data?.[0] || bankAccountsData?.[0];

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  const handleCopy = () => {
    if (!activeBank?.account_number) return;
    navigator.clipboard.writeText(activeBank.account_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);

    if (selectedFile) {
      // 1. Check if the file is an image
      if (!selectedFile.type.startsWith("image/")) {
        setFileError("Invalid file type. Please upload an image (JPG, PNG).");
        setFile(null);
        return;
      }

      // 2. Check size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setFileError("File is too large. Maximum size allowed is 2MB.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleClose = () => {
    setFile(null);
    setFileError(null);
    setRef("");
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-[1.5rem] bg-white p-6 text-left align-middle shadow-2xl transition-all border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Dialog.Title className="text-xl font-black uppercase tracking-tight text-slate-900">
                      Confirm Payment
                    </Dialog.Title>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      Order #{orderId}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                  >
                    <FiX size={20} />
                  </button>
                </div>

                {/* DYNAMIC BANK CARD SECTION */}
                <div className="bg-slate-900 rounded-[1.2rem] p-6 text-white mb-8 shadow-xl shadow-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-4xl uppercase tracking-tighter">
                    Warespire
                  </div>

                  <div className="relative z-10 space-y-5">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] bg-primary-100 px-2 py-0.5 rounded text-white uppercase font-black tracking-widest">
                        Official Account
                      </span>
                      {isBankLoading ? (
                        <Skeleton className="w-24 h-3 rounded bg-slate-700" />
                      ) : (
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                          {activeBank?.account_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">
                        Account Number
                      </p>
                      <div className="flex items-center justify-between">
                        {isBankLoading ? (
                          <Skeleton className="w-40 h-8 rounded-lg bg-slate-700" />
                        ) : (
                          <h3 className="text-2xl font-black tracking-tighter">
                            {activeBank?.account_number || "----------"}
                          </h3>
                        )}
                        <button
                          onClick={handleCopy}
                          disabled={isBankLoading}
                          type="button"
                          className={`p-2.5 rounded-xl transition-all ${copied ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                        >
                          {copied ? (
                            <FiCheck size={18} />
                          ) : (
                            <FiCopy size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-end pt-2 border-t border-white/5">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-0.5">
                          Bank Name
                        </p>
                        {isBankLoading ? (
                          <Skeleton className="w-24 h-4 rounded bg-slate-700" />
                        ) : (
                          <p className="text-xs font-bold uppercase">
                            {activeBank?.bank_name}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-0.5">
                          Payment Phase
                        </p>
                        <p className="text-[10px] font-black uppercase text-primary-100">
                          {type === "goods" ? "Procurement" : "Logistics"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* UPLOAD AREA */}
                  <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1 mb-2 tracking-widest">
                      <FiUploadCloud className="text-primary-100" /> Proof of
                      Payment
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-[2rem] p-4 transition-all cursor-pointer 
        ${fileError ? "border-red-500 bg-red-50/30" : file ? "border-green-500 bg-green-50/30" : "border-slate-200 bg-slate-50/50 hover:border-primary-100"}`}
                      onClick={() =>
                        !file &&
                        document.getElementById("modal-upload")?.click()
                      }
                    >
                      <input
                        type="file"
                        id="modal-upload"
                        hidden
                        onChange={handleFileChange}
                        accept="image/*" // Strictly restrict to images in the file picker
                      />

                      {file ? (
                        <div className="relative">
                          <div className="h-48 w-full rounded-2xl overflow-hidden border border-green-100 bg-white flex items-center justify-center">
                            {/* Since we only allow images, we can remove the PDF check here */}
                            <img
                              src={URL.createObjectURL(file)}
                              className="h-full w-full object-contain"
                              alt="Receipt Preview"
                            />
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <FiTrash size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <div className="size-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
                            <FiUploadCloud
                              className={`text-xl ${fileError ? "text-red-400" : "text-slate-400"}`}
                            />
                          </div>
                          <p
                            className={`text-xs font-black uppercase tracking-tight ${fileError ? "text-red-600" : "text-slate-700"}`}
                          >
                            {fileError
                              ? "Invalid File"
                              : "Upload Receipt Image"}
                          </p>
                          <p className="text-[9px] text-slate-400 mt-1 font-bold uppercase tracking-tighter">
                            JPG, PNG, WEBP (Max 2MB)
                          </p>
                        </div>
                      )}
                    </div>
                    {fileError && (
                      <p className="flex items-center gap-1 mt-2 text-red-500 text-[10px] font-black italic">
                        <FiAlertCircle /> {fileError}
                      </p>
                    )}
                  </div>

                  <button
                    disabled={!file || isLoading}
                    onClick={() => file && onUpload(file, ref, date)}
                    className="w-full py-5 bg-primary-100 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary-100/30 disabled:opacity-50 transition-all flex justify-center items-center hover:translate-y-[-2px] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      "Confirm & Submit"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PaymentUploadModal;
