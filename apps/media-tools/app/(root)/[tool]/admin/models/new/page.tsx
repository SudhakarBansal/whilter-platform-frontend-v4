"use client";

import { buildToolBreadcrumbs } from "@/utils/breadcrumbs/buildToolBreadcrumbs";
import { pageLayoutPresets } from "@whilter/shared-layouts/styled";
import { getToolBySlug } from "@/lib/getToolBySlug";
import type { ToolPageProps } from "@/types/tool.types";
import NotFound from "@/app/(root)/not-found";
import { FormContainer } from "@whilter/forms";
import PageClientLayout from "@/layouts/page-client-layout/PageClientLayout";
import { toast } from "sonner";
import { useState } from "react";
import { ModelMediaPanel } from "./ModelMediaPanel";
import { ModelControls } from "./ModelControls";

// Default values for the form matching the JSON structure
const defaultValues = {
  speaker_name: "",
  reference_voice: "",
  is_update_speed: false,
  is_update_loudness: false,
  is_update_transition: false,
  is_transcribe: false,
  is_update_audio_length: true,
  is_trim_silence: true,
  is_use_index_file: true,
  is_add_constant_silence: false,
  speed: "1.0",
  speech_rate: "1.0",
  pitch: "1.0",
  language_checkpoints: [
    {
      language: "English",
      reference_audio: "",
      reference_audio_text: "",
      adjacent_audio: "",
      index_path: "",
      sample_rate: "44100",
      model_path: "",
      required_audio_length: 4000,
      keep_silence: 300,
      silence_length: 500,
      transcribe_language: "English",
    },
  ],
};

export default function ModelPage({ params }: ToolPageProps) {
  const { tool: toolSlug } = params;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate tool existence
  const tool = getToolBySlug(toolSlug);
  if (!tool) return <NotFound />;

  const breadcrumbs = buildToolBreadcrumbs(toolSlug, "modelsNew");

  const onSubmit = async (data: any) => {
    console.log("data", data);

    if (isSubmitting) return;

    setIsSubmitting(true);
    const loadingToastId = toast.loading("Creating new model...");

    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Add the reference voice file
      if (data.reference_voice) {
        formData.append("reference_voice", data.reference_voice);
      }

      // Transform data to match the expected JSON structure
      const modelData = {
        speaker_name: data.speaker_name,
        is_update_speed: data.is_update_speed,
        is_update_loudness: data.is_update_loudness,
        is_update_transition: data.is_update_transition,
        is_transcribe: data.is_transcribe,
        is_update_audio_length: data.is_update_audio_length,
        is_trim_silence: data.is_trim_silence,
        is_use_index_file: data.is_use_index_file,
        is_add_constant_silence: data.is_add_constant_silence,
        speed: data.speed,
        speech_rate: data.speech_rate,
        pitch: data.pitch,
        language_checkpoints: data.language_checkpoints,
      };

      formData.append("data", JSON.stringify(modelData));

      const response = await fetch("/api/models", {
        method: "POST",
        body: formData,
      });

      toast.dismiss(loadingToastId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.message || `Request failed with status ${response.status}`;

        toast.error("Model Creation Failed", {
          description: errorMessage,
        });
        return;
      }

      const result = await response.json();
      console.log("Success:", result);

      toast.success("Model Created Successfully!", {
        description: "Your voice model has been added to the system.",
        action: {
          label: "View Models",
          onClick: () => {
            // Navigate to models list
            console.log("Navigate to models list:", result);
          },
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.dismiss(loadingToastId);

      toast.error("Something went wrong", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
      <PageClientLayout
        breadcrumbs={breadcrumbs}
        heading={tool.title}
        description={tool.description}
        config={pageLayoutPresets.dashboard}
      >
        <div className="flex flex-col min-h-screen gap-2">
          <div className="flex flex-col flex-1 gap-3 md:gap-4">
            <div className="grid gap-3 lg:gap-8 flex-1 grid-cols-1 lg:grid-cols-12 items-start">
              <div className="lg:col-span-8 flex flex-col min-h-[500px] bg-transparent">
                <ModelMediaPanel />
              </div>
              <div className="lg:col-span-4 p-6 md:p-6 flex flex-col min-h-[500px] h-full bg-gradient-to-b from-blue-400 to-blue-800 shadow-sm rounded-[1rem] lg:sticky lg:top-2 lg:self-start lg:h-auto">
                <ModelControls />
              </div>
            </div>
          </div>
        </div>
      </PageClientLayout>
    </FormContainer>
  );
}
